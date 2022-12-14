export type RootStackParamList = {
    LoginStack: LoginStackParamList;
    MainTabNavigator: MainStackParamList;
};

export type LoginStackParamList = {
    Login: undefined;
    Signup: undefined;
};

export type MainStackParamList = {
    Home: undefined;
    Settings: undefined;
};

export interface IUser {
    email: string;
    token: string;
    full_name: string;
}

export type LoginResponse = {
    token: string;
    email: string;
    full_name: string;
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
