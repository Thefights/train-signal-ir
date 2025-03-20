using Microsoft.AspNetCore.SignalR;
using train_signal_ir_sever.Models;

namespace train_signal_ir_sever.SignalIr
{
    public class ProductHub : Hub
    {

        public async Task SendProductAdd(Product product)
        {
            await Clients.All.SendAsync("ReceiveProductAdd", product);
        }

        public async Task SendProductUpdate(Product product)
        {
            await Clients.All.SendAsync("ReceiveProductUpdate", product);
        }

        public async Task  SendProductDelete(int id)
        {
            await Clients.All.SendAsync("ReceiveProductDelete", id);
        }
    }
}
