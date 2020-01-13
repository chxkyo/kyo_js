// entry-server.js
export default function createApp() {
    const app = new Vue({
        render: h => h(App)
    });
    return app;  
};