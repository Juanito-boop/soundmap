export default function findCode(code: string): string[] | null {
  const America = ["CO", "CW", "GF", "GD", "SX", "AR", "TC", "DM", "UM", "CR", "HT", "BB", "HN", "PR", "FK", "KN", "LC", "BQ", "BO", "CL", "US", "GP", "MX", "VC", "BM", "DO", "GT", "EC", "MQ", "SR", "BL", "BS", "PY", "VG", "BR", "BZ", "VE", "SV", "PE", "TT", "GL", "GY", "JM", "AW", "KY", "CU", "UY", "MF", "AG", "CA", "PA", "MS", "NI", "PM", "VI", "AI"];
  const Europe = ["NO", "GR", "AX", "CH", "HR", "IS", "LU", "HU", "NL", "LT", "SK", "LI", "MD", "IT", "JE", "MC", "BY", "LV", "AD", "FR", "GI", "DK", "MK", "MT", "CZ", "GG", "XK", "SJ", "ME", "FO", "AL", "RS", "UA", "IM", "EE", "RO", "BG", "DE", "PL", "GB", "FI", "SE", "VA", "RU", "AT", "CY", "PT", "BA", "BE", "ES", "SI", "SM", "IE"];
  const Asia = ["KR", "TW", "JO", "NP", "TH", "KZ", "GE", "PK", "AM", "ID", "JP", "LA", "LB", "PH", "BH", "QA", "TJ", "CN", "YE", "IN", "KW", "SY", "MV", "UZ", "IR", "MM", "LK", "BT", "PS", "BD", "SG", "TR", "AE", "AF", "TL", "VN", "KH", "IQ", "BN", "KG", "AZ", "HK", "MY", "MN", "SA", "TM", "KP", "IL", "OM", "MO"];
  const Africa = ["LS", "CF", "MA", "SL", "BF", "ER", "TZ", "DZ", "MR", "SD", "EH", "AO", "CI", "TN", "ML", "BJ", "CV", "GQ", "UG", "BW", "BI", "ZA", "LY", "YT", "GA", "CM", "GN", "SC", "IO", "MG", "CD", "GM", "SO", "NG", "SS", "SZ", "EG", "SH", "SN", "TG", "KE", "RW", "NA", "LR", "ZM", "NE", "KM", "GW", "GH", "TD", "ZW", "RE", "ST", "MW", "ET", "CG", "DJ", "MU", "MZ"];
  const Oceania = ["NC", "SB", "MH", "VU", "NU", "NR", "CC", "FJ", "WF", "CK", "AU", "TV", "PN", "CX", "GU", "TO", "TK", "WS", "KI", "PF", "PG", "PW", "AS", "MP", "NF", "NZ", "FM"];

  if (America.includes(code)) return America.filter(c => c !== code);
  if (Europe.includes(code)) return Europe.filter(c => c !== code);
  if (Asia.includes(code)) return Asia.filter(c => c !== code);
  if (Africa.includes(code)) return Africa.filter(c => c !== code);
  if (Oceania.includes(code)) return Oceania.filter(c => c !== code);

  return null;
}