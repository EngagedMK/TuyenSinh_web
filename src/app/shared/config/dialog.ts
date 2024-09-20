import { TYPE, useToast } from "vue-toastification";
import CustomContent from "@/app/shared/components/molecules/toast/CustomContent.vue";

const messageSuccess = ({
  title,
  response = null,
}: {
  title: string;
  response?: string | null | any;
}) => {
  const toast = useToast();

  const content = {
    component: CustomContent,
    props: {
      title,
      content: response ?? "",
    },
  };
  toast(content, {
    type: TYPE.SUCCESS,
  });
};

const messageWarning = ({
  title,
  response = null,
}: {
  title: string;
  response?: string | null | any;
}) => {
  const toast = useToast();

  const content = {
    component: CustomContent,
    props: {
      title,
      content: response ?? "",
    },
  };
  toast(content, {
    type: TYPE.WARNING,
  });
};

const messageError = ({
  title,
  response = null,
}: {
  title: string;
  response?: string | null | any;
}) => {
  const toast = useToast();

  const content = {
    component: CustomContent,
    props: {
      title,
      content: response ?? "",
    },
  };
  toast(content, {
    type: TYPE.ERROR,
  });
};

const messageFromAxios = (title: string, value: string) => {
  const toast = useToast();
  const content = {
    component: CustomContent,
    props: {
      title,
      content: value,
    },
  };
  toast(content, {
    type: TYPE.ERROR,
  });
};

const messageErrorLogin = (response: any) => {
  const toast = useToast();

  const content = {
    component: CustomContent,
    props: {
      title: "Error login",
      content: response?.data?.message ?? "Username or password not match",
    },
  };
  toast(content, {
    type: TYPE.ERROR,
  });
};

export const _dialog = {
  messageSuccess,
  messageError,
  messageWarning,
  messageFromAxios,
  messageErrorLogin,
};
