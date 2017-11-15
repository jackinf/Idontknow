namespace Idontknow.Domain.ViewModels.Helper
{
    public class FileMetadataViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public byte[] Buffer { get; set; } = new byte[0];
        public long SizeInBytes => Buffer?.LongLength ?? 0;

        public string BlobName { get; set; }
        public string Type { get; set; }
    }
}