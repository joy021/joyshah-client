import axios from "axios";

// Define types for request and response
interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  message: string;
}

interface LoginUserRequest {
  email: string;
  password: string;
}

interface LoginUserResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

interface UpdateUserProfileRequest {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}

// Register User API Call
export const registerUser = async (data: RegisterUserRequest): Promise<RegisterUserResponse> => {
  const response = await axios.post("/api/users/register", data);
  return response.data;
};

// Login User API Call
export const loginUser = async (data: LoginUserRequest): Promise<LoginUserResponse> => {
  const response = await axios.post("/api/users/login", data);
  return response.data;
};

// Get Current Logged-in User API Call
export const getCurrentUser = async () => {
  const response = await axios.get("/api/users/current-user");
  return response.data;
};

// Get All Users API Call
export const getAllUsers = async () => {
  const response = await axios.get("/api/users/get-all-users");
  return response.data;
};

// Update User Data API Call
export const updateUserData = async (data: any) => {
  const response = await axios.put("/api/users/update-user", data);
  return response.data;
};

export const updateUserProfile = async (updatedUser: UpdateUserProfileRequest) => {
  try {
    const response = await axios.put("/api/users/update-profile", updatedUser);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || "Failed to update profile";
    } else {
      throw "An unknown error occurred";
    }
  }
};