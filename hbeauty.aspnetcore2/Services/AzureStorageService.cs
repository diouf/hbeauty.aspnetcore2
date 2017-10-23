using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.Azure; // Namespace for CloudConfigurationManager
using Microsoft.WindowsAzure.Storage; // Namespace for CloudStorageAccount
using Microsoft.WindowsAzure.Storage.Blob; // Namespace for Blob storage types
using System.IO;

namespace hbeauty_aspnetcore2.Sevices
{
    public static class AzureStorageService 
    {
        private static CloudStorageAccount storageAccount; 
        
        static AzureStorageService()
        {
             var connStr = "DefaultEndpointsProtocol=https;AccountName=hbeauty;AccountKey=dqFCfvLIKJSMLxVjzK1pzm0OZpnlOjJKszernzyXAy9H85RhSWExDDXN/7KTn63+bh3HC8XoySEKV2pcQyfgEg==;EndpointSuffix=core.windows.net";
             storageAccount = CloudStorageAccount.Parse( connStr );
        }

        public static async Task UploadProductImage(string fileName, Stream fileStream)
        {
            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.GetContainerReference("service-item-images");

            // Retrieve reference to a blob
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(fileName);
            fileStream.Position = 0;
            await blockBlob.UploadFromStreamAsync(fileStream);
        }

    }
}