export interface PhoneValidationResult {
  isValid: boolean;
  e164?: string;
  digits?: string;
  error?: string;
}

export function validateSaudiPhone(raw: string): PhoneValidationResult {
  const cleaned = raw.replace(/[\s\-\(\)]/g, "");
  const regex = /^(?:\+?966|0)?5\d{8}$/;

  if (!regex.test(cleaned)) {
    return {
      isValid: false,
      error: "أدخلي رقم جوال سعودي صحيح (05XXXXXXXX)",
    };
  }

  let digits9: string;
  if (cleaned.startsWith("+966")) {
    digits9 = cleaned.slice(4);
  } else if (cleaned.startsWith("966")) {
    digits9 = cleaned.slice(3);
  } else if (cleaned.startsWith("0")) {
    digits9 = cleaned.slice(1);
  } else {
    digits9 = cleaned;
  }

  const e164 = `+966${digits9}`;
  const digits = `966${digits9}`;

  return {
    isValid: true,
    e164,
    digits,
  };
}

export function formatPhoneDisplay(e164: string): string {
  if (!e164.startsWith("+966")) return e164;
  const local = e164.slice(4);
  return `0${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5)}`;
}
