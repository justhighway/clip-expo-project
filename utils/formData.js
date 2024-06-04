const createFormData = (images, json) => {
  const formData = new FormData();

  images.forEach((image, index) => {
    formData.append("profileImg", {
      uri: image,
      name: `image${index}.jpg`,
      type: "image/jpeg",
    });
  });

  formData.append("json", JSON.stringify(json));

  return formData;
};

export { createFormData };
