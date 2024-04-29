export function notificationsLabel(count) {
  if (count === 0) {
    return "no notifications";
  }
  if (count > 99) {
    return "more than 99 notifications";
  }
  return `${count} notifications`;
}

export function isAdminOrSuperadmin(user) {
  if (user) {
    return Boolean(user.role === "superadmin" || user.role === "admin");
  }
}

export function isSuperadmin(user) {
  if (user) {
    return user.role === "superadmin";
  }
}

export function isClient(user) {
  if (user) {
    return user.role === "client";
  }
}

export const resetForm = (form) => {
  if (form.current) {
    form.current.reset();
  }
};

export const isDataValid = (data) => {
  return Object.values(data).every((val) => val && val.length > 0);
};

export const getBrandNameById = (id, brands) => {
  const brand = brands.find((brand) => brand._id == id);
  return brand && brand.name;
};

export const updateProducts = (products, cart, page) => {
  let result = products
    .map((product) => ({
      ...product,
      serverId: cart.find((el) => el._id === product._id)?.serverId || null,
    }))
    .filter((product) => product.isPublish);

  if (page === "new") {
    return result.filter((product) => product.salePrice > 0);
  } else {
    return result;
  }
};

export const formatData = (data) => {
  const formatted = data.products.map((product) => {
    return {
      ...product,
      brand: getBrandNameById(product.brandId, data.brands),
    };
  });

  return formatted;
};
