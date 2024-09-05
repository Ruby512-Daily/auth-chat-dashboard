import 'package:flutter/material.dart';
import 'package:auth_dashboard/screens/login_screen.dart';
import 'package:auth_dashboard/screens/account_screen.dart';
import 'package:auth_dashboard/screens/profile_screen.dart';
import 'package:auth_dashboard/utils/utils.dart';
import 'package:auth_dashboard/constants/app_constants.dart';

void navigateToHome(BuildContext context, String role) async {
  Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (ctx) {
    if (role == user) {
      //return const ProfileScreen();
    }
    if (role == admin) {
      return AccountScreen();
    }
    return LoginScreen();
  }));
}

void navigateToLogin(BuildContext context) {
  Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (ctx) {
    return LoginScreen();
  }));
}
