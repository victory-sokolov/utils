import { isIP } from 'node:net';

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
export const isPrivateIpv4 = (address: string): boolean => {
    const octets = address.split('.').map(Number);
    const [first = -1, second = -1] = octets;

    return (
        first === 10 ||
        first === 127 ||
        (first === 169 && second === 254) ||
        (first === 172 && second >= 16 && second <= 31) ||
        (first === 192 && second === 168) ||
        (first === 100 && second >= 64 && second <= 127) ||
        first >= 224 ||
        first === 0
    );
};

/**
 * Check if address is private IPV6
 * @param address IP address
 * @returns True if IP address is private
 */
export const isPrivateIpv6 = (address: string): boolean => {
    const normalized = address.toLowerCase();

    if (normalized.startsWith('::ffff:')) {
        const ipv4 = normalized.slice(7);
        if (isIP(ipv4) === 4) {
            return isPrivateIpv4(ipv4);
        }
    }

    const isLinkLocal = (): boolean => {
        const prefix = normalized.slice(0, 3);
        return prefix === 'fe8' || prefix === 'fe9' || prefix === 'fea' || prefix === 'feb';
    };

    return (
        normalized === '::1' ||
        isLinkLocal() ||
        normalized.startsWith('fc') ||
        normalized.startsWith('fd') ||
        normalized === '::'
    );
};

/**
 * Check if address is private (IPV4 or IPV6)
 * @param address IP address
 * @returns True if IP address is private
 */
export const isPrivateAddress = (address: string): boolean => {
    const family = isIP(address);
    if (family === 4) {
        return isPrivateIpv4(address);
    }

    if (family === 6) {
        return isPrivateIpv6(address);
    }

    return false;
};
