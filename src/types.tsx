export type RootStackParamList = {
    AuthStack: AuthStackParamList;
    MainTabStack: MainStackParamList;
};

export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
    ForgotPassword1: undefined;
    ForgotPassword2: undefined;
};

export type MainStackParamList = {
    Home: undefined;
    Settings: undefined;
    ChangePassword: undefined;
    DeleteAccount: undefined;
};

export interface IUser {
    email: string;
    token: string;
    full_name: string;
    id: string;
}

export type LoginResponse = {
    token: string;
    email: string;
    full_name: string;
    id: string;
    error?: string;
};

export type BeehiveData = {
    _id: string;
    name: string;
    location: string;
    description: string;
    color: string;
    assigned_number: number;
    population: number;
    birthday: string;
};
