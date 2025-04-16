"use client";

import React from 'react';
import { Button, Result } from "antd";
import { NextPage } from "next";

const Page: NextPage = (): React.ReactElement => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Maaf, halaman ini tidak ditemukan"
      extra={<Button type="primary" onClick={() => history.back()}>Back</Button>}
    />
  );
};

export default Page;