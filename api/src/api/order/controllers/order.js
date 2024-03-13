// 引入必要的模組
const product = require("../../product/controllers/product");

// 引入 stripe 模組並設定金鑰
const stripe = require("stripe")(process.env.STRIPE_KEY);

("use strict");

/**
 * order controller
 */
// 使用 Strapi 框架提供的函數創建核心控制器
const { createCoreController } = require("@strapi/strapi").factories;

// 導出控制器函數
module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  // 創建訂單函數
  async create(ctx) {
    // 從請求內容中獲取購物車資訊
    const { cart } = ctx.request.body;
    // 如果購物車資訊不存在，返回錯誤訊息
    if (!cart) {
      ctx.response.status = 400;
      return { error: "Cart not found in request body" };
    }
    // 將購物車商品轉換為 Stripe 的 line_items 格式
    const lineItems = await Promise.all(
      cart.map(async (product) => {
        // 從 Strapi 中獲取商品資訊
        const item = await strapi
          .service("api::product.product")
          .findOne(product.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100, // Stripe 要求以最小貨幣單位表示價格（例如美分）
          },
          quantity: product.amount,
        };
      })
    );

    try {
      // 創建 Stripe 支付 session
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}?success=true`, // 成功支付後跳轉的頁面
        cancel_url: `${process.env.CLIENT_URL}?success=false`, // 取消支付後跳轉的頁面
        line_items: lineItems, // 商品資訊
        shipping_address_collection: { allowed_countries: ["US", "CA"] }, // 收貨地址限制
        payment_method_types: ["card"], // 支付方式限制
      });
      // 在 Strapi 中創建訂單
      await strapi.service("api::order.order").create({
        data: {
          products: cart, // 購物車商品資訊
          stripeId: session.id, // Stripe session ID
        },
      });
      // 返回 Stripe session 資訊
      return { stripeSession: session };
    } catch (error) {
      // 處理錯誤情況
      ctx.response.status = 500;
    }
  },
}));