export const uploadProfilePicture = {
    header: "Upload Your Profile Picture",
    description:
      "Choose a clear photo of yourself. PNG, JPEG, JPG, WEBP file formats up to 10 MB are supported.",
    button: {
      id: 1,
      frontendSlug: "upload_profile_picture",
      title: "Upload Picture",
      type: "submit",
    },
    isFormData: true,
    fields: [
      {
        id: 1,
        order: 1,
        frontendSlug: "profile_picture",
        label: null,
        name: "profile_picture",
        type: "file",
        accept: "image/png, image/jpeg",
        inputType: "file",
        required: true,
        requiredMessage: "A profile picture is required!",
        labels: [
          {
            title: "Allowed formats",
            value: ["PNG", "JPEG", "JPG", "WEBP"],
          },
          {
            title: "Max size",
            value: "10 MB",
          },
        ],
      },
    ],
    links: [
      {
        id: 1,
        frontendSlug: "chat",
        label: "Want to do this later?",
        labelWithLink: "Skip for now",
        route: "/chat",
      },
    ],
  };
  