
export const uploadImage = async (image: File): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
        throw new Error("ImgBB API key is missing");
    }

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
            method: "POST",
            body: formData,
        }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error("Image upload failed");
    }

    return result.data.url;
};
