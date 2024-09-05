import 'package:auth_dashboard/constants/color_constants.dart';
import 'package:auth_dashboard/screens/login_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Auth DashBoard',
        theme: ThemeData.dark().copyWith(
            scaffoldBackgroundColor: bgColor, canvasColor: secondaryColor),
        home: LoginScreen());
  }
}
