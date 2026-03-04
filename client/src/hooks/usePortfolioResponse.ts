import { useEffect } from "react";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { usePortfolio } from "./usePortfolio";
import type { AboutValues } from "../context/portfolioContext";
import { useCloudinaryUpload } from "./useCloudinary";
import type { ProfileCardValues } from "../validation/formSchema";
import { useNavigate } from "react-router-dom";

export function useGetMyPortfolio(enabled: boolean | "" | undefined) {
  const api = useAxiosPrivate();
  const { changePortfolioState } = usePortfolio();

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    const portfolio = async () => {
      try {
        const response = await api.get("/portfolio/me", {
          signal: controller.signal,
        });
        changePortfolioState(response.data);
      } catch (error: any) {
        console.error(error.response.data.message);
      }
    };

    portfolio();

    return () => {
      controller.abort();
    };
  }, []);
}

export function useGetPublicPortfolio(
  username: string | undefined,
  enabled: boolean | "" | undefined,
) {
  const navigate = useNavigate();
  const api = useAxiosPrivate();
  const { changePortfolioState } = usePortfolio();

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    const portfolio = async () => {
      try {
        const response = await api.get(`/portfolio/public/${username}`, {
          signal: controller.signal,
        });
        changePortfolioState(response.data);
      } catch (error: any) {
        navigate("/not-found");
        console.error(error.response.data.message);
      }
    };

    portfolio();

    return () => {
      controller.abort();
    };
  }, []);
}

export function useCreatePortfolio() {
  const api = useAxiosPrivate();
  const { changePortfolioState, changeLoadingState } = usePortfolio();
  const { uploadImages } = useCloudinaryUpload();

  const createPortfolio = async (data: ProfileCardValues) => {
    changeLoadingState(true);

    const { imageProfile, imageBackground, ...others } = data;

    try {
      const uploaded = await uploadImages(imageProfile, imageBackground);

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
