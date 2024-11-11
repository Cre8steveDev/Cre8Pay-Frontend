interface UserData {
  fullName: string;
  email: string;
  password: string;
  networkProvider: string;
  phone: string;
}

const validateUserData = (
  userData: UserData
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  console.log(userData);

  // Validate fullName
  if (!userData.fullName.trim()) {
    errors.push("Full name is required");
  } else if (userData.fullName.length < 3) {
    errors.push("Full name must be at least 3 characters");
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userData.email.trim()) {
    errors.push("Email is required");
  } else if (!emailRegex.test(userData.email)) {
    errors.push("Invalid email format");
  }

  // Validate password
  if (!userData.password) {
    errors.push("Password is required");
  } else if (userData.password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }

  // Validate networkProvider
  if (!userData.networkProvider.trim()) {
    errors.push("Network provider is required");
  }

  // Validate phone
  const phoneRegex = /^\+?[0-9]\d{1,11}$/;
  if (!userData.phone.trim()) {
    errors.push("Phone number is required");
  } else if (!phoneRegex.test(userData.phone)) {
    errors.push("Invalid phone number format");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default validateUserData;
