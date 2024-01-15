import { ProfileFormSubmit, ProfileFormValues } from "@/components/ProfileSettings/SettingsForm/SettingsForm";

export const filterValuesProfileForm = (obj: ProfileFormSubmit) => {
    const filteredEntries = Object.entries(obj).filter(([key, value]) => {
        if (key === 'dateOfBirth' && !value.length) {
            return false
        }
        
        return true;
    });


    return Object.fromEntries(filteredEntries) as ProfileFormSubmit;
};

