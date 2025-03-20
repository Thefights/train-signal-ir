using Microsoft.AspNetCore.SignalR;

namespace train_signal_ir_sever.SignalIr
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
            => await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
