import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:auth_dashboard/login_screen.dart';

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
            scaffoldBackgroundColor: Color(0xFF212332),
            canvasColor: Color(0xFF2A2D3E)),
        home: LoginScreen());
  }
}
