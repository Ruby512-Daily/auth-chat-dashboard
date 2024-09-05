import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:auth_dashboard/constants/responsive.dart';
import 'package:auth_dashboard/constants/app_texts.dart';
import 'package:auth_dashboard/constants/color_constants.dart';
import 'package:auth_dashboard/utils/utils.dart';
import 'package:auth_dashboard/widgets/login_form.dart';

class LoginScreen extends ConsumerWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: Center(
        child: SizedBox(
          width: 800,
          height: 600,
          child: Card(
            surfaceTintColor: Colors.transparent,
            color: splashBackground,
            shadowColor: loginShadowColor,
            margin: EdgeInsets.fromLTRB(30.0, 20.0, 30.0, 40.0),
            elevation: 8,
            clipBehavior: Clip.antiAlias,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20.0),
            ),
            child: Row(
              children: [
                getLoginFormWidget(),
                if (Responsive.isDesktop(context)) getBrandLogoWidget()
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget getLoginFormWidget() {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(50),
        color: Colors.white,
        width: double.infinity,
        height: double.infinity,
        child: const Center(
          child: LoginForm(),
        ),
      ),
    );
  }

  Widget getBrandLogoWidget() {
    return Expanded(
      child: SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                AppTexts.adminDashboard,
                style: TextStyle(
                    color: Colors.black,
                    fontSize: 24,
                    fontWeight: FontWeight.bold),
              ),
              add24VerticalSpace(),
              const Image(
                image: AssetImage("/images/logo.png"),
                width: 200,
                height: 200,
              ),
              add24VerticalSpace(),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 24),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
