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
    NewHive: undefined;
    HiveDetails: { hive: BeehiveData };
    EditHive: { hiveId: string };
    Settings: undefined;
    ChangePassword: undefined;
    DeleteAccount: undefined;
    NewRecord: { hiveId: string; balanceType: "INCOME" | "EXPENSE" };
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

export type RecordData = {
    _id: string;
    type: RecordType;
    amount: number;
    date: Date;
    description: string;
};

export enum RecordType {
    SALE_HONEY = "Honey",
    SALE_BEESWAX = "Beeswax",
    SALE_PROPOLIS = "Pollen",
    FEEDING = "Feeding",
    INSPECTION = "Inspection",
    TREATMENT = "Treatment",
    OTHER = "Other",
}
