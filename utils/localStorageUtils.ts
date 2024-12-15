interface UserDetails {
  user: {
    id: number;
    username?: string;
    email?: string;
  };
  token: string;
}

export const getUserDetailsFromStorage = (): UserDetails | null => {
  try {
    const userDetailsString = localStorage.getItem("userDetails");
    if (!userDetailsString) return null;

    const userDetails = JSON.parse(userDetailsString);
    if (!userDetails.token) throw new Error("Token not found in userDetails");

    return userDetails;
  } catch (error) {
    // Explicitly cast 'error' to 'Error' for type safety
    if (error instanceof Error) {
      console.error("Error retrieving user details from localStorage:", error.message);
    } else {
      console.error("An unknown error occurred while retrieving user details.");
    }
    return null;
  }
};

// Utility to fetch token directly
export const getTokenFromStorage = (): string | null => {
  const userDetails = getUserDetailsFromStorage();
  return userDetails?.token || null;
};
