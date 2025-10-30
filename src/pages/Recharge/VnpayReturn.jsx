import {
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Button, Divider, Modal, Result, Space, Tag, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paymentApi } from "../../services/api/paymentApi";
import { userApi } from "../../services/api/userApi";

const VnpayReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Đang xác thực giao dịch...");
  const [status, setStatus] = useState("pending"); // pending | success | fail

  const queryString = useMemo(() => location.search, [location.search]);
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const responseCode = params.get("vnp_ResponseCode");
  const amount = params.get("vnp_Amount");
  const orderInfo = params.get("vnp_OrderInfo");
  const transactionNo = params.get("vnp_TransactionNo");
  const payDate = params.get("vnp_PayDate");

  useEffect(() => {
    const verify = async () => {
      try {
        const result = await paymentApi.verifyVnpayReturn(queryString);
        // Tùy backend trả gì, hiển thị đơn giản
        setMessage(result?.message || "Thanh toán thành công!");
        setStatus("success");

        // Cập nhật lại số dư/ thông tin user sau khi thanh toán thành công
        try {
          const profile = await userApi.getProfile();
          if (profile) {
            localStorage.setItem("user", JSON.stringify(profile));
          }
        } catch {}

        // Tự điều hướng về trang nạp tiền sau 2 giây
        setTimeout(() => navigate("/recharge"), 2000);
      } catch (err) {
        setMessage(
          err?.response?.data?.message || "Xác thực giao dịch thất bại!"
        );
        setStatus("fail");
      }
    };
    verify();
  }, [queryString, navigate]);

  const title =
    status === "pending"
      ? "Đang xác thực giao dịch"
      : status === "success"
      ? "Thanh toán thành công"
      : "Thanh toán thất bại";
  const resultStatus =
    status === "pending" ? "info" : status === "success" ? "success" : "error";
  const icon =
    status === "pending" ? (
      <InfoCircleFilled style={{ color: "#1677ff" }} />
    ) : status === "success" ? (
      <CheckCircleFilled style={{ color: "#22c55e" }} />
    ) : (
      <CloseCircleFilled style={{ color: "#ef4444" }} />
    );

  return (
    <>
      <Modal
        open
        centered
        width={680}
        title={null}
        footer={null}
        maskClosable={false}
        onCancel={() => navigate("/recharge")}
      >
        <Result
          status={resultStatus}
          icon={icon}
          title={title}
          subTitle={message}
          extra={
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <Button onClick={() => navigate("/recharge")}>
                Quay lại trang nạp tiền
              </Button>
              <Button type="primary" onClick={() => navigate("/")}>
                Về trang chủ
              </Button>
            </div>
          }
        />
        <div style={{ marginTop: 8 }}>
          <Divider style={{ margin: "8px 0 16px" }} />
          <Space
            direction="vertical"
            size={8}
            style={{ width: "100%", textAlign: "center" }}
          >
            {amount && (
              <Typography.Text>
                <strong>Số tiền:</strong>{" "}
                <Tag color="green">
                  {Number(amount).toLocaleString("vi-VN")} VND
                </Tag>
              </Typography.Text>
            )}
            {orderInfo && (
              <Typography.Text>
                <strong>Đơn hàng:</strong> {decodeURIComponent(orderInfo)}
              </Typography.Text>
            )}
            {transactionNo && (
              <Typography.Text copyable>
                <strong>Mã giao dịch:</strong> {transactionNo}
              </Typography.Text>
            )}
            {payDate && (
              <Typography.Text>
                <strong>Thời gian:</strong> {payDate}
              </Typography.Text>
            )}
            {responseCode && (
              <Typography.Text>
                <strong>Mã phản hồi:</strong>{" "}
                <Tag color={status === "success" ? "green" : "error"}>
                  {responseCode}
                </Tag>
              </Typography.Text>
            )}
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default VnpayReturn;
