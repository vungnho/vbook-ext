let BASE_URL = 'https://nettruyen.net.vn';
try {
    if (CONFIG_URL) {
        BASE_URL = CONFIG_URL;
    }
} catch (error) {
}