import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {t("registration")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              {t("submitRegistration")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
