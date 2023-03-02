namespace StudioManagementSystem;

public interface ICancellationTokenAccessor
{
    CancellationToken Token { get; }
}

// ReSharper disable once ClassNeverInstantiated.Global
public class CancellationTokenAccessor : ICancellationTokenAccessor
{
    public CancellationToken Token => new CancellationTokenSource().Token;
}
