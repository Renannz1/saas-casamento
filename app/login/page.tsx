'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Heart, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    // Validações
    if (isSignUp) {
      if (password.length < 6) {
        setError('A senha deve ter no mínimo 6 caracteres')
        return
      }
      if (password !== confirmPassword) {
        setError('As senhas não coincidem')
        return
      }
    }

    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password)
        setSuccessMessage('Conta criada com sucesso! Verifique seu email para confirmar.')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      } else {
        await signIn(email, password)
      }
    } catch (err: any) {
      // Traduzir mensagens de erro do Supabase
      const errorMessage = err.message || ''
      
      if (errorMessage.includes('Invalid login credentials')) {
        setError('Email ou senha incorretos')
      } else if (errorMessage.includes('Email not confirmed')) {
        setError('Por favor, confirme seu email antes de fazer login')
      } else if (errorMessage.includes('User already registered')) {
        setError('Este email já está cadastrado')
      } else if (errorMessage.includes('Invalid email')) {
        setError('Email inválido')
      } else if (errorMessage.includes('Password should be at least 6 characters')) {
        setError('A senha deve ter no mínimo 6 caracteres')
      } else {
        setError('Erro ao autenticar. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-[hsl(var(--foreground))]">Nuptial</h1>
          <p className="text-muted-foreground mt-2 font-body">
            {isSignUp ? 'Crie sua conta' : 'Organização financeira do seu casamento'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-lg bg-success/10 text-success text-sm">
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-[hsl(var(--card))] rounded-2xl shadow-sm border border-[hsl(var(--border))] p-6 space-y-5"
        >
          <div>
            <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                required
                minLength={6}
                disabled={loading}
              />
            </div>
            {isSignUp && (
              <p className="text-xs text-muted-foreground mt-1">Mínimo 6 caracteres</p>
            )}
          </div>

          {isSignUp && (
            <div>
              <label className="text-sm font-medium text-[hsl(var(--foreground))] mb-1.5 block">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Aguarde...' : isSignUp ? 'Criar Conta' : 'Entrar'}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
                setSuccessMessage('')
                setConfirmPassword('')
              }}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
