public class MOCKSMSsending
{
    public bool SendOtp(string toPhoneNumber, string otp)
    {
        // MOCK SMS sending — just print to console
        Console.WriteLine($"[MOCK SMS] OTP '{otp}' sent to phone number: {toPhoneNumber}");
        return true;
    }
}
