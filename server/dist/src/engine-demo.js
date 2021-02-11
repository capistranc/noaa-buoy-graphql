module.exports = {
    schemaTag: 'current',
    generateClientInfo: function (_a) {
        var request = _a.request;
        if (!request || !request.http)
            return {};
        var clientName = request.http.headers.get('client-name');
        var clientVersion = request.http.headers.get('client-version');
        return { clientName: clientName, clientVersion: clientVersion };
    },
};
