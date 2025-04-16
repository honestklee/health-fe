"use client";

import { UtilAuth } from "@/utils/UtilAuth";
import { Button, Result } from "antd";
import { NextPage } from "next";
import { useEffect } from "react";

const Page: NextPage = () => {

  useEffect(() => {
    UtilAuth.onLogout();
    setTimeout(() => {
      location.href = "/no-auth/login";
    }, 2000);
  }, []);

  return (
    <Result
      status="403"
      title="401"
      subTitle="Akses tidak izinkan"
      extra={<Button type="primary" onClick={() => location.href = "/no-auth/login"}>Login</Button>}
    />
  );
};

export default Page;
