/**
 * Validate if IP is valid IPV4
 * @param ip IP address
 * @returns True if IPV4 is valid
 */
export const isValidIPV4 = (ip: string): boolean => {
    const regex =
        /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/;
    return regex.test(ip);
};

/**
 * Validate if IP is valid IPV6
 * @param ip IP address
 * @returns True if IPV6 is valid
 */
export const isValidIPV6 = (ip: string): boolean => {
    const regex =
        /^(([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}|([0-9a-f]{1,4}:){1,6}:[0-9a-f]{1,4}|([0-9a-f]{1,4}:){1,5}(:[0-9a-f]{1,4}){1,2}|([0-9a-f]{1,4}:){1,4}(:[0-9a-f]{1,4}){1,3}|([0-9a-f]{1,4}:){1,3}(:[0-9a-f]{1,4}){1,4}|([0-9a-f]{1,4}:){1,2}(:[0-9a-f]{1,4}){1,5}|[0-9a-f]{1,4}:((:[0-9a-f]{1,4}){1,6})|:((:[0-9a-f]{1,4}){1,7}|:)|fe80:(:[0-9a-f]{0,4}){0,4}%[0-9a-z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?\d)?\d)\.){3}(25[0-5]|(2[0-4]|1?\d)?\d)|([0-9a-f]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?\d)?\d)\.){3}(25[0-5]|(2[0-4]|1?\d)?\d))$/i;
    return regex.test(ip);
};

/**
 * Check if address is private IPV4
 * @param address IP address
 * @returns True if IP address is private
 */
export const isPrivateIpv4 = (ip: string): boolean => {
    const [a = -1, b = -1] = ip.split('.').map(Number);

    return (
        a === 10 ||
        (a === 172 && b >= 16 && b <= 31) ||
        (a === 192 && b === 168) ||
        a === 127 ||
        (a === 169 && b === 254)
    );
};

/**
 * Check if address is private IPV6
 * @param address IP address
 * @returns True if IP address is private
 */
export const isPrivateIpv6 = (ip: string): boolean => {
    if (!isValidIPV6(ip)) {
        return false;
    }

    const normalized = ip.toLowerCase();

    if (normalized === '::1') return true;

    // Unique local addresses (fc00::/7).
    // The /7 prefix covers both fc00::/8 and fd00::/8,
    // Any address starting with "fc" or "fd" is considered private.
    if (normalized.startsWith('fc') || normalized.startsWith('fd')) {
        return true;
    }

    // Link-local addresses (fe80::/10).
    // The /10 prefix covers addresses from fe80:: through febf::,
    // Which correspond to prefixes starting with fe8, fe9, fea, or feb.
    if (
        normalized.startsWith('fe8') ||
        normalized.startsWith('fe9') ||
        normalized.startsWith('fea') ||
        normalized.startsWith('feb')
    ) {
        return true;
    }

    // IPv4-mapped IPv6
    const mapped = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    const mappedIpv4 = mapped?.[1];

    if (mappedIpv4 && isValidIPV4(mappedIpv4)) {
        return isPrivateIpv4(mappedIpv4);
    }

    return false;
};

/**
 * Check if address is private (IPV4 or IPV6)
 * @param address IP address
 * @returns True if IP address is private
 */
export const isPrivateAddress = (address: string): boolean => {
    if (isValidIPV4(address)) {
        return isPrivateIpv4(address);
    }

    if (isValidIPV6(address)) {
        return isPrivateIpv6(address);
    }

    return false;
};
