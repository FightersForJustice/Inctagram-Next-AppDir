import React, { useEffect } from "react";
import s from "../Tabs.module.scss";
import Image from "next/image";
import { TransparentBtn } from "../../../../../components/TransparentBtn/TransparentBtn";
import { SettingsForm } from "../../SettingsForm/SettingsForm";
import * as Tabs from "@radix-ui/react-tabs";
import { toast } from "react-toastify";
import { useDeleteProfileAvatarMutation, useGetProfileQuery } from "../../../../../api/profile.api";
import { Loader } from "../../../../../components/Loader/Loader";
import { useTranslations } from "next-intl";
import { handleApiError } from "../../../../../utils/handleApiError";

export const GeneralInformationTab: React.FC<Props> = ({ setShowAddAvatarModal, setLoadedAvatar, loadedAvatar }) => {
  const t = useTranslations("SettingsProfilePage.GeneralInformationTab");

  const [deleteAvatar] = useDeleteProfileAvatarMutation();
  const { data, isLoading, error } = useGetProfileQuery();

  useEffect(() => {
    if (data?.avatars.length) {
      setLoadedAvatar(data?.avatars[0]?.url);
    }
  }, [data]);

  const onDeleteAvatar = () => {
    deleteAvatar()
      .unwrap()
      .then(() => setLoadedAvatar(""))
      .catch((err) => toast.error(err.error));
  };

  if (error) {
    handleApiError(error);
  }

  return (
    <>
      <Tabs.Content className={s.TabsContent} value="generalInformation">
        <div className={s.wrapper}>
          <div className={s.wrapper__left}>
            <Image
              src={`${loadedAvatar ? loadedAvatar : "/img/settings-profile/load-avatar.svg"}`}
              alt={"load-avatar"}
              width={192}
              height={192}
              className={s.wrapper__image}
              priority={true}
            />
            {loadedAvatar && (
              <Image
                src={"/img/settings-profile/delete.svg"}
                alt={"delete"}
                width={24}
                height={24}
                onClick={onDeleteAvatar}
                className={s.wrapper__delete}
              />
            )}
            <TransparentBtn onClick={() => setShowAddAvatarModal(true)}>{t("addBtn")}</TransparentBtn>
          </div>
          <div className={s.wrapper__right}>
            <SettingsForm userBirthday={data?.dateOfBirth} translate={t} />
          </div>
        </div>
      </Tabs.Content>
      {isLoading && <Loader />}
    </>
  );
};

type Props = {
  loadedAvatar: string;
  setLoadedAvatar: (value: string) => void;
  setShowAddAvatarModal: (value: boolean) => void;
};
