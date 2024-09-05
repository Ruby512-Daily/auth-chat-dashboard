import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:auth_dashboard/utils/form_validators.dart';
import 'package:auth_dashboard/utils/loading_dialog_manager.dart';
import 'package:auth_dashboard/constants/app_texts.dart';
import 'package:auth_dashboard/constants/app_constants.dart';
import 'package:auth_dashboard/routing/routes.dart';
import 'package:auth_dashboard/utils/utils.dart';

class LoginForm extends ConsumerStatefulWidget {
  const LoginForm({super.key});
  @override
  ConsumerState<LoginForm> createState() {
    return _LoginFormState();
  }
}

class _LoginFormState extends ConsumerState<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  String _userName = "";
  String _password = "";

  Future<void> loginUser(BuildContext context) async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
    }
    LoadingDialog.show(context, AppTexts.pleaseWait);
    final response = await http.post(
      Uri.parse('${kBaseUrl}/api/login'), // Use the correct URL of your backend
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'username': _userName,
        'password': _password,
      }),
    );
    LoadingDialog.hide(context);
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      var token = data["token"];
      var id = data["_id"];
      var role = data["role"];
      saveUserData(token, id, role);
      navigateToHome(context, role);
    } else {
      showSnackBar(context, AppTexts.invalidCredential);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(mainAxisSize: MainAxisSize.min, children: [
        _getTitle(),
        add24VerticalSpace(),
        _getUsernameField(),
        add16VerticalSpace(),
        _getPasswordField(),
        add16VerticalSpace(),
        _getActionButton()
      ]),
    );
  }

  Widget _getUsernameField() {
    return TextFormField(
      style: const TextStyle(color: Colors.black, fontSize: 16),
      decoration: _getInputDecoration(AppTexts.userName),
      validator:
          FormValidators.getEmptyValueValidator(AppTexts.usernameErrorMessage),
      onSaved: (value) {
        _userName = value!;
      },
    );
  }

  Widget _getTitle() {
    return const Text(
      AppTexts.login,
      style: TextStyle(
        color: Colors.black,
        fontWeight: FontWeight.bold,
        fontSize: 24,
      ),
    );
  }

  Widget _getPasswordField() {
    return TextFormField(
      style: const TextStyle(color: Colors.black, fontSize: 16),
      obscureText: true,
      decoration: _getInputDecoration(AppTexts.password),
      validator:
          FormValidators.getEmptyValueValidator(AppTexts.passwordErrorMessage),
      onSaved: (value) {
        _password = value!;
      },
    );
  }

  Widget _getActionButton() {
    return Align(
      alignment: Alignment.bottomRight,
      child: ElevatedButton(
        onPressed: () {
          loginUser(context);
        },
        style: ElevatedButton.styleFrom(backgroundColor: Colors.black),
        child: const Text(
          AppTexts.login,
          style: TextStyle(color: Colors.white),
        ),
      ),
    );
  }

  InputDecoration _getInputDecoration(String hints) {
    return InputDecoration(
      fillColor: const Color(0xffF6F8FB).withOpacity(0.5),
      filled: true,
      border: const OutlineInputBorder(),
      label: Text(
        hints,
        style: const TextStyle(color: Colors.black87),
      ),
    );
  }
}
