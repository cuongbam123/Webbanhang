const paypalService = require('../services/paypal.service');

exports.verifyPayment = async (req, res) => {
    try {
        const { orderID } = req.body;
        const order = await paypalService.verifyPayment(orderID);

        if (order.status === "COMPLETED") {
            // Nếu muốn: lưu đơn hàng vào database tại đây
            return res.status(200).json({ message: "Thanh toán thành công", order });
        } else {
            return res.status(400).json({ message: "Thanh toán chưa hoàn tất", order });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Lỗi xác thực thanh toán", error: err.message });
    }
};
