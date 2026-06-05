import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/boot-up",
      permanent: true,
    },
  };
};

export default function IndexPage() {
  return null;
}
