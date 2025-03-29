export const formatCurrency = (amount) => {
    return Number(amount).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    })
}