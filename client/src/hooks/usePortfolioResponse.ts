import { useEffect, useState } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { usePortfolio } from "./usePortfolio";
import type { AboutValues } from "../context/portfolioContext";
import { useCloudinaryUpload } from "./useCloudinary";
import type { ProfileCardValues, SocialLinkValues } from "../validation/formSchema";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./useAuth";

export function useGetPortfolio(username?: string) {
  const api = useAxiosPrivate();
  const navigate = useNavigate();

  const { authData } = useAuth();
  const { changePortfolioState } = usePortfolio();

  const [isLoading, setIsLoading] = useState(true);

  const isOwner = !!authData.accessToken && !!username && authData.username === username;

  const isPublic = !!username && (!authData.accessToken || authData.username !== username);

  useEffect(() => {
    if (authData.isLoggedOff) return;

    const controller = new AbortController();

    const fetchPortfolio = async () => {
      try {
        setIsLoading(true);

        if (isOwner) {
          const response = await api.get("/portfolio/me", {
            signal: controller.signal,
          });

          changePortfolioState(response.data);
        } else if (isPublic) {
          const response = await api.get(`/portfolio/public/${username}`, {
            signal: controller.signal,
          });
          changePortfolioState(response.data);
        }
      } catch (error: any) {
        if (axios.isCancel(error)) return;

        navigate("/not-found");
        console.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();

    return () => {
      controller.abort();
    };
  }, [username]);

  return {
    isLoading: isLoading || authData.isLoggedOff,
  };
}

export function useCreatePortfolio() {
  const api = useAxiosPrivate();
  const { changePortfolioState, changeLoadingState } = usePortfolio();
  const { uploadImages } = useCloudinaryUpload();

  const createPortfolio = async (data: ProfileCardValues) => {
    changeLoadingState(true);

    const { imageProfile, imageBackground, ...others } = data;

    try {
      const uploaded = await uploadImages(imageProfile[0], imageBackground[0]);

      if (!uploaded.imageProfile?.image || !uploaded.imageBackground?.image) {
        throw new Error("Cloudinary upload failed, try again later");
      }

      const payload: AboutValues = {
        ...others,
        imageProfile: uploaded.imageProfile,
        imageBackground: uploaded.imageBackground,
      };

      const portfolioResponse = await api.post("/portfolio", {
        about: payload,
      });
      changePortfolioState(portfolioResponse.data);
    } catch (error: any) {
      throw error;
    } finally {
      changeLoadingState(false);
    }
  };

  return { createPortfolio };
}

export function useCreatePortfolioLinks() {
  const api = useAxiosPrivate();
  const { changePortfolioState } = usePortfolio();

  const createPortfolioLinks = async (data: SocialLinkValues) => {
    try {
      const portfolioResponse = await api.post("/portfolio/links", data);
      changePortfolioState(portfolioResponse.data);
    } catch (error: any) {
      throw error;
    }
  };

  return { createPortfolioLinks };
}

export function useUpdatePortfolio(section: string) {
  const api = useAxiosPrivate();
  const { changePortfolioState } = usePortfolio();

  const updatePortfolio = async <T>(data: T) => {
    try {
      const portfolioResponse = await api.put(`/portfolio/${section}`, data);
      changePortfolioState(portfolioResponse.data);
    } catch (error: any) {
      throw error;
    }
  };

  return { updatePortfolio };
}

export function useDeletePortfolioInfo() {
  const api = useAxiosPrivate();
  const { changePortfolioState } = usePortfolio();

  const deletePortfolioInfo = async (infoId: string, section: string) => {
    try {
      const portfolioResponse = await api.delete(`/portfolio/remove/${section}/${infoId}`);
      changePortfolioState(portfolioResponse.data);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  return { deletePortfolioInfo };
}
