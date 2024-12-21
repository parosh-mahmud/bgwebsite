interface UserDetails {
  user: {
    id: number;
    username?: string;
    email?: string;
  };
  token: string;
}

const isClient = typeof window !== "undefined";

export const getUserDetailsFromStorage = (): UserDetails | null => {
  if (!isClient) return null;

  try {
    const userDetailsString = localStorage.getItem("userDetails");
    if (!userDetailsString) return null;

    const userDetails = JSON.parse(userDetailsString) as UserDetails;
    if (!userDetails.token) throw new Error("Token not found in userDetails");

    return userDetails;
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return null;
  }
};

export const getTokenFromStorage = (): string | null => {
  const userDetails = getUserDetailsFromStorage();
  return userDetails?.token || null;
};

export const setUserDetailsToStorage = (userDetails: UserDetails): void => {
  if (!isClient) return;

  try {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  } catch (error) {
    console.error("Error saving user details to localStorage:", error);
  }
};

export const clearUserDetailsFromStorage = (): void => {
  if (!isClient) return;

  try {
    localStorage.removeItem("userDetails");
  } catch (error) {
    console.error("Error clearing user details from localStorage:", error);
  }
};
