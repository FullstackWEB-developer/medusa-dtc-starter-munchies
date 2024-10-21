"use client";

import {Link} from "@/components/shared/button";
import Body from "@/components/shared/typography/body";
import {convertToLocale} from "@/utils/medusa/money";

import {useCart} from "./cart-context";

export default function CartFooter() {
  const {cart} = useCart();

  const total = cart
    ? convertToLocale({
        amount: cart.total,
        currency_code: cart.currency_code,
      })
    : null;

  const cartIsEmpty = cart?.items?.length === 0;

  if (cartIsEmpty) return null;

  return (
    <>
      <div className="h-px w-full bg-accent" />
      <div className="flex w-full flex-col justify-between gap-4 p-s">
        <div className="flex w-full justify-between gap-4">
          <div>
            <Body className="font-semibold" font="sans" mobileSize="base">
              Subtotal
            </Body>
            <Body font="sans" mobileSize="sm">
              Taxes and shipping calculated at checkout
            </Body>
          </div>
          {total && (
            <Body font="sans" mobileSize="base">
              {total}
            </Body>
          )}
        </div>
        {!cartIsEmpty && (
          <Link className="w-full" href="/checkout" size="lg" variant="primary">
            Go to checkout
          </Link>
        )}
      </div>
    </>
  );
}
