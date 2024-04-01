import { fireEvent, render, screen } from "@testing-library/react";
import Form from ".";

test("Koşulların onaylanmasına göre buton aktifliği", () => {
  // Test edilecek olan bileşen render edilir
  render(<Form />);

  //Gerekli elemanları çağır
  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  //Checkboxın tiklenmemiş olduğunu kontrol et
  expect(checkbox).not.toBeChecked();

  //Butonun inaktif olduğunu kontrol et
  expect(button).toBeDisabled();

  //Checkbox a tıkla
  fireEvent.click(checkbox);

  //Butonun aktif olduğunu kontrol et
  expect(button).toBeEnabled();

  //Checboxa tıkla
  fireEvent.click(checkbox);

  //Butonun inaktif olduğunu kontrol et eleman ekranda varmı
  expect(button).toBeDisabled();
});

test("Onay butonunun hover durumuna göre bildirim gözükür", () => {
  //Formu renderla
  render(<Form />);

  //Gerekli elemanları al
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  const alert = screen.getByText(/size gerçekten/i); //insensetive büyük küçük harfe dikkat etme regex yöntemi kullandık

  //Checkbox tikle buton aktif hale gelir
  fireEvent.click(checkbox);

  //Bildirimin ekranda olmadığını kontrol et
  expect(alert).not.toBeVisible();

  //Mouse u butona getir
  fireEvent.mouseEnter(button);

  //Bildirim ekrana geldi mi kontrol et
  expect(alert).toBeVisible();

  //Mouse u butondan çek
  fireEvent.mouseLeave(button);

  //Bildirim ekrandan gitti mi kontrol et
  expect(alert).not.toBeVisible();
});
