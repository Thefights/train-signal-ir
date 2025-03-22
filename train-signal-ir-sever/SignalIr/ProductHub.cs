using Microsoft.AspNetCore.SignalR;
using train_signal_ir_sever.Models;

namespace train_signal_ir_sever.SignalIr
{
    public class ProductHub : Hub
    {

        public async Task SendProductAdd(Product product)
        {
            await Clients.All.SendAsync("ReceiveProductAdded", product);
        }

        public async Task SendProductUpdate(Product product)
        {
            await Clients.All.SendAsync("ReceiveProductUpdated", product);
        }

        public async Task  SendProductDelete(int id)
        {
            await Clients.All.SendAsync("ReceiveProductDeleted", id);
        }
    }
}
