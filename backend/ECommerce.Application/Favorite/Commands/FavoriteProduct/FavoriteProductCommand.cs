using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ECommerce.Application.Common.Interfaces;
using ECommerce.Application.Common.Models;
using ECommerce.Domain.Entities;
using MediatR;

namespace ECommerce.Application.Favorite.Commands.FavoriteProduct
{
    public class FavoriteProductCommand
    {
        public class Command : IRequest<Result<Unit>> 
        {
            public Guid ProductId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IUnitOfWork _unitOfWork;
            private readonly ICurrentUserService _currentUserService;

            public Handler(IUnitOfWork unitOfWork, ICurrentUserService currentUserService)
            {
                _unitOfWork = unitOfWork;
                _currentUserService = currentUserService;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _unitOfWork.ProductRepository.Get(request.ProductId);

                if (product == null) return Result<Unit>.Failure("Product not found");

                await _unitOfWork.UserFavoriteRepository.AddAsync(new UserFavorite {
                    ProductId = product.Id,
                    UserId = _currentUserService.UserId,
                });

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}