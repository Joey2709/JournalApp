import axios from "axios";

export const fileUpload = async (file: any) => {
  if (!file) throw new Error("No tenemos ningún archivo a subir");
  const cloudUrl = "https://api.cloudinary.com/v1_1/djnds34i8/upload";
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const res = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
      mode: "cors",
    });
    console.log(res);
    if (!res.ok) throw new Error("No se pudo subir imagen");
    const cloudResp = await res.json();

    return cloudResp.secure_url;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
};
