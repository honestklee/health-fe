"use client";

import React from 'react';
import { Button, Result } from "antd";
import { NextPage } from "next";

const Page: NextPage = (): React.ReactElement => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Maaf, kamu tidak bisa mengakses halaman ini"
      extra={<Button type="primary" onClick={() => history.back()}>Back</Button>}
    />
  );
};

export default Page;