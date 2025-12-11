export const handleSelect = (params = {}) => {
    const {
        setDropdownActive = () => null,
        dropdownActive = false,
        onSelect = undefined,
        frontendSlug = "",
        value = ""
    } = params

    setDropdownActive(!dropdownActive);

    onSelect && (
        onSelect({
            frontendSlug,
            value,
          })
    )
  };


  export const iconMap = {
        role: "User",
        dropdown_active: "AngleDown",
        dropdown_inactive: "AngleUp",
  }
