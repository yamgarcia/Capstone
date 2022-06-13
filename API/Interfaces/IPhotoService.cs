using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        /// <summary>
        ///     Parsed response after upload of the image resource.
        /// </summary>
        /// <param name="file"> The file </param>
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        
        /// <summary>
        ///     Parsed result of asset deletion. A very specific ID is needed to delete photos
        /// </summary>
        /// <param name="publicId"> The Cloudinary Public ID </param>
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}