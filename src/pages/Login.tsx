
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient'; // Import supabase client

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Add state for registration form if needed (first name, last name, confirm password)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      toast.success('Login successful!');
      navigate('/'); // Redirect to home page after login
    } catch (error: any) {
      toast.error(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { // Optional: Store first/last name if your Supabase table allows
            first_name: firstName,
            last_name: lastName,
          }
        }
      });
      if (error) throw error;
      toast.success('Registration successful! Please check your email for verification.');
      // Optionally switch to login tab or clear form
      // navigate('/login'); // Or stay on page
    } catch (error: any) {
      toast.error(error.error_description || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <CardTitle>Login to Your Account</CardTitle>
                  <CardDescription>
                    Log in to access website features.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label> {/* Changed id */}
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label> {/* Changed id */}
                      {/* <Link to="/forgot-password" className="text-sm text-secondary hover:underline">
                        Forgot password?
                      </Link> */}
                       {/* TODO: Implement forgot password if needed */}
                    </div>
                    <Input
                      id="login-password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button
                    type="submit"
                    className="w-full"
                    variant="secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardHeader>
                  <CardTitle>Create New Account</CardTitle>
                  <CardDescription>
                    Register to access website features.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label> {/* Changed id */}
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label> {/* Changed id */}
                    <Input
                      id="register-password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {/* 
                  <div className="space-y-1">
                    <div className="flex items-start">
                      <input // Consider using ShadCN Checkbox component
                        type="checkbox"
                        id="terms"
                        className="mt-1 mr-2"
                        required
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link to="/terms" className="text-secondary hover:underline">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-secondary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div> 
                  */} {/* TODO: Add Terms & Conditions checkbox if needed */}
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    variant="secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Register"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
