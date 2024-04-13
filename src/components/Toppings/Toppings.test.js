import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toppings from ".";

test("sosları ekleme ve çıkarma işlemleri sepet toplamına etki eder", async () => {
  const user = userEvent.setup();

  //1.Bileşeni renderla
  render(<Toppings />);

  //2.Toplam spanı al
  const total = screen.getByTestId("total");

  //3.Bütün sos checboxlarını al
  const toppings = await screen.findAllByRole("checkbox");

  //4.Toplam ücret 0 mı kontrol et
  expect(total.textContent).toBe("0");

  //5.Bütün checkbox'ların tiksiz olduğunu kontrol et
  toppings.forEach((i) => expect(i).not.toBeChecked());

  //6.Soslardan birine tıkla
  await user.click(toppings[0]);

  //7.Toplam 3 e eşitmi kontrol et
  expect(total.textContent).toBe("3");

  //8.Soslardan birine daha tıkla
  await user.click(toppings[4]);

  //9.Total 6 ya eşit mi kontrol et
  expect(total.textContent).toBe("6");

  //10.Eklenen soslardan birini çıkar
  await user.click(toppings[4]);

  //11.Toplam 3 e eşit mi kontrol et
  expect(total.textContent).toBe("3");

  //12.Eklenen son sosu çıkar
  await user.click(toppings[0]);

  //13.Toplam 0 a eşit mi kontrol et
  expect(total.textContent).toBe("0");
});
