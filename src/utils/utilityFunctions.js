export function formatPhoneNumber(phoneNumber) {
  console.log(phoneNumber);
  const digitsOnly = phoneNumber.toString().replace(/\D/g, "");

  if (digitsOnly.length < 10) {
    return phoneNumber;
  }

  const firstThreeDigit = digitsOnly.substring(
    digitsOnly.length - 7,
    digitsOnly.length - 4
  );

  const lastFourDigit = digitsOnly.substring(digitsOnly.length - 4);

  const formattedNumber = `0750 ${firstThreeDigit} ${lastFourDigit}`;

  return formattedNumber;
}
